package test1;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class test_manager extends SeleneseTestCase {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		//selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://localhost:9000/");
		selenium = new DefaultSelenium("localhost", 4444, "*googlechrome", "http://localhost:9000/");
		selenium.start();
	}

	@Test
	public void testTest_manager() throws Exception {
		selenium.open("/");
		selenium.type("id=name", "test_manager");
		selenium.type("id=password", "test_manager");
		selenium.click("css=button.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.click("css=a.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.type("id=dishName", "test_dish1");
		selenium.type("name=dish[price]", "10");
		selenium.type("id=quantity", "20");
		selenium.click("css=button.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.click("css=a.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.type("id=dishName", "test_dish2");
		selenium.type("name=dish[price]", "20");
		selenium.type("id=quantity", "100");
		selenium.click("css=button.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.click("xpath=(//a[contains(text(),'�޸Ĳ�Ʒ���')])[2]");
		selenium.waitForPageToLoad("30000");
		selenium.click("name=dish-check");
		selenium.type("name=count", "10");
		selenium.click("//button[@type='submit']");
		assertEquals("�޸ĳɹ�", selenium.getAlert());
		selenium.click("name=dish-check");
		selenium.click("xpath=(//input[@name='dish-check'])[2]");
		selenium.type("name=count", "20");
		selenium.type("xpath=(//input[@name='count'])[2]", "20");
		selenium.click("//button[@type='submit']");
		assertEquals("�޸ĳɹ�", selenium.getAlert());
		selenium.click("link=��ҳ");
		selenium.waitForPageToLoad("30000");
		selenium.click("xpath=(//a[contains(text(),'ɾ����Ʒ')])[2]");
		selenium.waitForPageToLoad("30000");
		selenium.addSelection("id=all-dish-list", "label=test_dish2");
		selenium.click("css=button.btn.btn-default");
		assertEquals("ɾ���ɹ�", selenium.getAlert());
		selenium.addSelection("id=all-dish-list", "label=test_dish1");
		selenium.click("css=button.btn.btn-default");
		assertEquals("ɾ���ɹ�", selenium.getAlert());
		selenium.click("link=��ҳ");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=ѡ��");
		selenium.click("link=��Ӳ�Ʒ");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=ѡ��");
		selenium.click("link=ɾ����Ʒ");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=ѡ��");
		selenium.click("link=�޸Ĳ�Ʒ���");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=ѡ��");
		selenium.click("link=�ǳ�");
		selenium.waitForPageToLoad("30000");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
